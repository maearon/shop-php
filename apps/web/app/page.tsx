"use client";
import { NextPage } from 'next'
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import Pagination from 'react-js-pagination'
import Skeleton from 'react-loading-skeleton'
import micropostApi, { CreateResponse, ListResponse, Micropost } from '../components/shared/api/micropostApi'
import ShowErrors, { ErrorMessageType } from '@/components/shared/errorMessages'
import flashMessage from '../components/shared/flashMessages'
import { useAppSelector } from '../redux/hooks'
import { fetchUser, selectUser } from '../redux/session/sessionSlice'
import { useDispatch } from 'react-redux';
import HeroBanner from "@/components/home/HeroBanner"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import CategoryGrid from "@/components/home/CategoryGrid"
import PromoSection from "@/components/home/PromoSection"
import Newsletter from "@/components/home/Newsletter"
import SocialProof from "@/components/home/SocialProof"


const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SCOPE = process.env.SCOPE;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_KEY = process.env.API_KEY;

const Home: NextPage = () => {
  const [page, setPage] = useState(1)
  const [feedItems, setFeedItems] = useState<any[]>([])
  const [total_count, setTotalCount] = useState(1)
  const [following, setFollowing] = useState(Number)
  const [followers, setFollowers] = useState(Number)
  const [micropost, setMicropost] = useState(Number)
  const [gravatar, setGavatar] = useState(String)
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [imageName, setImageName] = useState('')
  const inputEl = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<ErrorMessageType>({});
  const userData = useAppSelector(selectUser)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [authCode, setAuthCode] = useState<string | null>(null);

  const extractVideoId = (youtubeUrl: string): string | null => {
    const regExp = /embed\/([^?]*)/;
    const match = youtubeUrl.match(regExp);
    return (match && match[1]) ? match[1] : null;
  };

  const fetchVideoDetails = async (videoId: string) => {
    // https://www.geeksforgeeks.org/how-to-get-youtube-video-data-by-using-youtube-data-api-and-php/
    // https://console.cloud.google.com/apis/credentials?orgonly=true&project=apt-helix-426002-r5&supportedpurview=project,organizationId,folder
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const videoData = data.items[0].snippet;
      return {
        title: videoData.title,
        description: videoData.description.length > 240 ? videoData.description.substring(0, 240) + '...' : videoData.description,
        videoId: videoId,
        channelTitle: videoData.channelTitle,
      };
    } catch (error) {
      flashMessage('error', 'Failed to fetch video details')
      return {
        title: 'Number of requests you can make to the API within a given period has been surpassed' ,
        description: 'Number of requests you can make to the API within a given period has been surpassed',
        videoId: videoId,
        channelTitle: 'Number of requests you can make to the API within a given period has been surpassed',
      };
    }
  };

  const setFeeds = useCallback(async () => { 
    micropostApi.getAll({page: page}
    ).then(async (response: ListResponse<Micropost>) => {
      if (response.feed_items) {
        const updatedFeedItems = await Promise.all(
          response.feed_items.map(async (item) => {
            const videoId = extractVideoId(item.content);
            if (videoId) {
              const details = await fetchVideoDetails(videoId);
              if (details) {
                return { ...item, ...details };
              }
            }
            return item;
          })
        );
        setFeedItems(updatedFeedItems)
        setTotalCount(response.total_count)
        setFollowing(response.following)
        setFollowers(response.followers)
        setMicropost(response.micropost)
        setGavatar(response.gravatar)
        if (response.feed_items.length === 0 && page > 1) {
          setPage(prev => prev - 1);
        }
      } else {
        setFeedItems([])
      }
    })
    .catch((error: any) => {
      flashMessage('error', 'Set feed unsuccessfully')
    })
  }, [page])

  const handleAuthClick = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(fetchUser());
      } catch (error) {
        flashMessage('error', 'Failed to fetch user')
      } finally {
        setFeeds();
        setLoading(false);
      }
    };

    fetchUserData();

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code !== null) {
      const params = new URLSearchParams();
      params.append('code', code);
      params.append('client_id', CLIENT_ID || '');
      params.append('client_secret', CLIENT_SECRET || '');
      params.append('redirect_uri', REDIRECT_URI || '');
      params.append('grant_type', 'authorization_code');

      fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('accessToken', data.access_token);
        window.history.pushState({}, document.title, "/");
      })
      .catch(error => {
        flashMessage('error', 'Error exchanging code for token')
      });
    } else {
      flashMessage('error', 'Authorization code is missing from URL')
    }
  }, [dispatch, setFeeds]);

  const handleRate = async (videoId: any, rating: any) => {
    const accessToken = localStorage.getItem('accessToken');
  
    if (!accessToken) {
      flashMessage('warning', 'Access token is missing. Please authenticate.')
      handleAuthClick();
      return;
    }
  
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos/rate?id=${videoId}&rating=${rating}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 204) {
        flashMessage('success', `Video ${rating} successfully`)
      }

      if (response.status === 401) {
        flashMessage('error', `Video ${rating} unsuccessfully`)
        localStorage.removeItem("accessToken");
        handleRate(videoId, rating)
      }
    } catch (error) {
      flashMessage('error', `Video ${rating} unsuccessfully`)
      localStorage.removeItem("accessToken");
      handleRate(videoId, rating)
    }
  };

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setPage(pageNumber)
  }

  const handleContentInput = (e: any) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData2 = new FormData()
    formData2.append('micropost[content]', content)
    if (image) {
      formData2.append('micropost[image]', image || new Blob, imageName)
    }

    var BASE_URL = ''
    if (process.env.NODE_ENV === 'development') {
      BASE_URL = 'http://localhost:3001/api'
    } else if (process.env.NODE_ENV === 'production') {
      BASE_URL = 'https://ruby-rails-boilerplate-3s9t.onrender.com/api'
    }

    fetch(BASE_URL+`/microposts`, {
      method: "POST",
      body: formData2,
      credentials: 'include',
      headers: {
        'Authorization': localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined' ?
        `Bearer ${localStorage.getItem('token')} ${localStorage.getItem('remember_token')}` :
        `Bearer ${sessionStorage.getItem('token')} ${sessionStorage.getItem('remember_token')}`
      }
    })
    .then((response: any) => response.json().then((data: CreateResponse) => {
      if (data.flash) {
        setFeeds()
        // inputEl.current.blur()
        flashMessage(...data.flash)
        setContent('')
        setImage(null)
        setErrors({})
      }
      if (data.error) {
        // inputEl.current.blur()
      }
    })
    )
  }

  const removeMicropost = (micropostid: number) => {
    let sure = window.confirm("You sure?")
    if (sure === true) {
      micropostApi.remove(micropostid
      ).then(response => {
        if (response.flash) {
          flashMessage(...response.flash)
          setFeeds()
        }
      })
      .catch((error: any) => {
        flashMessage('error', 'Create micropost unsuccessfully')
      })
    }
  }

  return (
    <main>
      <HeroBanner />
      <FeaturedProducts />
      <CategoryGrid />
      <PromoSection />
      <Newsletter />
      <SocialProof />
    </main>
  )
}

export default Home

"use client"
import type { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type MutableRefObject, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import sessionApi from "@/components/shared/api/sessionApi"
import flashMessage from "@/components/shared/flashMessages"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import ShowErrors, { type ErrorMessageType } from "@/components/shared/errorMessages"
import FullScreenLoader from "@/components/ui/FullScreenLoader"
import { fetchUser, selectUser } from "@/store/sessionSlice"
import type { AppDispatch } from "@/store/store"
import { useAppSelector } from "@/store/hooks"
import Header from "@/components/header"
import Footer from "@/components/footer"

const initialValues = {
  email: "",
  password: "",
  rememberMe: "1",
  errors: [] as string[],
}

interface MyFormValues {
  email: string
  password: string
  rememberMe: string
  errors: string[]
}

const LoginPage: NextPage = () => {
  const router = useRouter()
  const inputEl = useRef() as MutableRefObject<HTMLInputElement>
  const [errors, setErrors] = useState<ErrorMessageType>({})
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()
  const userData = useAppSelector(selectUser)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(fetchUser())
      } catch (error) {
        console.error("Failed to fetch user:", error)
      } finally {
        setLoading(false)
        if (userData?.value?.email) {
          router.push("/")
        }
      }
    }

    fetchUserData()
  }, [dispatch, router, userData?.value?.email])

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  })

  const onSubmit = (values: MyFormValues) => {
    sessionApi
      .create({
        session: {
          email: values.email,
          password: values.password,
        },
      })
      .then((response) => {
        if (response.user) {
          inputEl.current.blur()
          const { token } = response.tokens.access
          if (values.rememberMe === "1") {
            localStorage.setItem("token", token)
            localStorage.setItem("refresh_token", response.tokens.refresh.token)
          } else {
            localStorage.setItem("token", token)
            localStorage.setItem("refresh_token", response.tokens.refresh.token)
            localStorage.setItem("guest_cart_id", "123-xyz")
          }
          dispatch(fetchUser())
          router.push("/")
        }
        if (response.flash) flashMessage(...response.flash)
        if (response.status === 401) {
          setErrors(response.errors)
        }
      })
      .catch((error) => {
        flashMessage("error", "User or password incorrect")
        setErrors({ email: ["or password incorrect"] })
      })
  }

  if (loading) return <FullScreenLoader />

  return userData.value.email ? (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
        <p className="text-gray-600 mb-8">You are already logged in.</p>
        <Link href="/my-account" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
          Go to My Account
        </Link>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Hero content */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">a</span>
                  </div>
                  <h2 className="text-2xl font-bold">JOIN ADICLUB. GET A 15% DISCOUNT.</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  As an adiClub member you get rewarded with what you love for doing what you love. Sign up today and
                  receive immediate access to these Level 1 benefits:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Free shipping
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>A 15% off voucher for your next purchase
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Access to Members Only products and sales
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Access to adidas Running and Training apps
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Special offers and promotions
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub.
                </p>
              </div>
            </div>

            {/* Right side - Login form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <span className="text-blue-600 font-bold text-2xl">adiclub</span>
                </div>
                <h2 className="text-xl font-bold mb-2">YOUR ADICLUB BENEFITS AWAIT</h2>
                <p className="text-gray-600 text-sm">
                  Get free shipping, discount vouchers and members only products when you're in adiClub.
                </p>
              </div>

              <p className="font-medium mb-4">Log in or sign up (it's free)</p>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {["apple", "facebook", "google", "yahoo"].map((provider) => (
                  <button
                    key={provider}
                    className="border border-gray-300 p-3 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label={`Login with ${provider}`}
                  >
                    <img src={`/icons/${provider}.svg`} alt={provider} className="h-5 text-xl" />
                  </button>
                ))}
              </div>
              {/* <div className="grid grid-cols-4 gap-2 mb-6">
                {[
                  { name: "apple", icon: "🍎" },
                  { name: "facebook", icon: "📘" },
                  { name: "google", icon: "🔍" },
                  { name: "yahoo", icon: "📧" },
                ].map((provider) => (
                  <button
                    key={provider.name}
                    className="border border-gray-300 p-3 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label={`Login with ${provider.name}`}
                  >
                    <span className="text-xl">{provider.icon}</span>
                  </button>
                ))}
              </div> */}

              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, errors: formErrors, touched }) => (
                  <Form className="space-y-4">
                    {Object.keys(errors).length > 0 && <ShowErrors errorMessage={errors} />}

                    <div>
                      <Field
                        name="email"
                        type="email"
                        placeholder="EMAIL ADDRESS *"
                        className={`w-full border p-3 rounded ${
                          formErrors.email && touched.email ? "border-red-500" : "border-gray-300"
                        } focus:border-blue-500 focus:outline-none`}
                      />
                      <ErrorMessage name="email">
                        {(error) => <div className="text-red-500 text-sm mt-1">{error}</div>}
                      </ErrorMessage>
                    </div>

                    <div>
                      <Field
                        name="password"
                        type="password"
                        placeholder="PASSWORD *"
                        className={`w-full border p-3 rounded ${
                          formErrors.password && touched.password ? "border-red-500" : "border-gray-300"
                        } focus:border-blue-500 focus:outline-none`}
                      />
                      <ErrorMessage name="password">
                        {(error) => <div className="text-red-500 text-sm mt-1">{error}</div>}
                      </ErrorMessage>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Field type="checkbox" name="rememberMe" value="1" className="mt-1" />
                      <label className="text-sm text-gray-600">
                        Keep me logged in. Applies to all options.{" "}
                        <Link href="#" className="text-blue-600 underline">
                          More info
                        </Link>
                      </label>
                    </div>

                    <button
                      type="submit"
                      ref={inputEl}
                      className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center"
                    >
                      CONTINUE →
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="mt-6 text-xs text-gray-500">
                <p className="mb-2">Sign me up to adiClub, featuring exclusive adidas offers and news</p>
                <p>
                  By clicking the "Continue" button, you are joining adiClub, will receive emails with the latest news
                  and updates, and agree to the{" "}
                  <Link href="#" className="text-blue-600 underline">
                    TERMS OF USE
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-blue-600 underline">
                    ADICLUB TERMS AND CONDITIONS
                  </Link>{" "}
                  and acknowledge you have read the{" "}
                  <Link href="#" className="text-blue-600 underline">
                    ADIDAS PRIVACY POLICY
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">JOIN OUR ADICLUB & GET 15% OFF</h3>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
          >
            SIGN UP FOR FREE →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LoginPage

module UserJwtClaims
  extend ActiveSupport::Concern

  ALGORITHM = 'HS512'.freeze # RFC 7518: JSON Web Algorithms (JWA) 256 384 512 May 2015
  ISS = 'http://localhost'.freeze # Issuer	Ai tạo ra token X
  SUB = 'spring-boilerplate-user'.freeze # Subject	Ai là chủ thể của token (thường là user id) V
  AUD = ['http://localhost'].freeze # Audience	Ai có quyền sử dụng token X
  ACCESS_TOKEN_EXPIRATION = 7.days # UNIX to ISO string
  ACCESS_TOKEN_EXPIRATION_FOR_DEV = 7.days # UNIX to ISO string
  REFRESH_TOKEN_EXPIRATION = 14.days # UNIX to ISO string
  REFRESH_TOKEN_EXPIRATION_FOR_DEV = 14.days # UNIX to ISO string
end

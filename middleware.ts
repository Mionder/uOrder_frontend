import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register')

  // Якщо токена немає і ми намагаємось зайти в адмінку


  // Якщо токен є, не пускаємо назад на реєстрацію/логін
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

// Вказуємо, які роути перевіряти
export const config = {
  matcher: ['/admin/:path*', '/login', '/register'],
}
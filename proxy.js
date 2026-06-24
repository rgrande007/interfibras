import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value, options)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isProtected =
    pathname.startsWith('/portal/dashboard') ||
    pathname.startsWith('/portal/admin')
  const isLoginPage = pathname === '/portal/login'

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/portal/login', request.url))
  }

  if (isLoginPage && user) {
    return NextResponse.redirect(new URL('/portal/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/portal/:path*'],
}

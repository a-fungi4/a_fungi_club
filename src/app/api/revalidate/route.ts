import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-sanity-webhook-secret')
    
    // Verify webhook secret
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    const { _type, slug } = body

    console.log('Revalidation webhook received:', { _type, slug })

    // Revalidate based on document type
    switch (_type) {
      case 'page':
        // Revalidate specific page
        if (slug?.current) {
          revalidatePath(`/${slug.current}`, 'page')
          console.log(`Revalidated page: /${slug.current}`)
        }
        break
        
      case 'siteSettings':
        // Revalidate all pages for global changes
        revalidatePath('/', 'layout')
        console.log('Revalidated all pages (site settings changed)')
        break
        
      case 'navigation':
        // Revalidate all pages with navigation
        revalidatePath('/', 'layout')
        console.log('Revalidated all pages (navigation changed)')
        break
        
      case 'pageSection':
        // Revalidate all pages that might use this section
        revalidatePath('/', 'layout')
        console.log('Revalidated all pages (section changed)')
        break
        
      case 'artProject':
        revalidatePath('/art', 'page')
        // Also revalidate any pages that reference this project
        revalidatePath('/', 'layout')
        console.log('Revalidated art page')
        break
        
      case 'portfolioProject':
        revalidatePath('/portfolio', 'page')
        revalidatePath('/', 'layout')
        console.log('Revalidated portfolio page')
        break
        
      case 'processBlock':
        revalidatePath('/about', 'page')
        revalidatePath('/', 'layout')
        console.log('Revalidated about page (process blocks changed)')
        break
        
      case 'banner':
      case 'hero':
      case 'bio':
      case 'resourceLink':
        // Revalidate all pages that might use these
        revalidatePath('/', 'layout')
        console.log(`Revalidated all pages (${_type} changed)`)
        break
        
      default:
        // Generic revalidation for unknown types
        revalidatePath('/', 'layout')
        console.log('Revalidated all pages (generic revalidation)')
    }

    return NextResponse.json({ 
      revalidated: true, 
      timestamp: Date.now(),
      documentType: _type,
    })
    
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

// For manual revalidation (useful for testing)
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path')
  
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }
  
  if (!path) {
    return NextResponse.json({ message: 'Path parameter required' }, { status: 400 })
  }
  
  try {
    revalidatePath(path, 'page')
    return NextResponse.json({ 
      revalidated: true, 
      path,
      timestamp: Date.now()
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

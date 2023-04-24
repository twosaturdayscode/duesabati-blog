import { redirect } from '@remix-run/cloudflare'

export const loader = async () => redirect('/home')

export default function Index() {
  return <div>hello</div>
}

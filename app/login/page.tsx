import { redirect } from 'next/navigation'

export default function LoginPage() {
  // Redirect to the home page with the #admin hash to trigger the login modal
  redirect('/#admin')
}

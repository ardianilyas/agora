import SignInForm from "@/features/auth/components/SignInForm"
import AuthSubtitle from "@/features/auth/components/ui/AuthSubtitle"
import AuthTitle from "@/features/auth/components/ui/AuthTitle"

export default function SignIn() {
  return (
    <>
      <div className="mb-3">
        <AuthTitle>Welcome Back</AuthTitle>
        <AuthSubtitle>Let’s pick up right where you left off.</AuthSubtitle>
      </div>
      <SignInForm />
    </>
  )
}
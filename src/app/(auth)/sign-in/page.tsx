import SignInForm from "@/features/auth/components/SignInForm"

export default function SignIn() {
  return (
    <>
      <div className="mb-3">
        <h3 className="text-2xl text-neutral-800 font-semibold">Welcome Back</h3>
        <p className="text-neutral-600 text-sm leading-relaxed">Let’s pick up right where you left off.</p>
      </div>
      <SignInForm />
    </>
  )
}
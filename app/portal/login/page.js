import LoginForm from '@/components/portal/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#072524] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#4BAF92]" />
            <span className="text-[#4BAF92] text-xs font-medium tracking-widest uppercase">
              Interfibras
            </span>
          </div>
          <h1 className="text-white text-2xl font-semibold mt-1">
            Portal do Aluno
          </h1>
          <p className="text-[#8ABFB2] text-sm mt-1">
            Acesse sua área de pesquisa
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

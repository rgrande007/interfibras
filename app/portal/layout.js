export const metadata = {
  title: 'Portal · INTERFIBRAS',
  description: 'Área restrita dos alunos do grupo INTERFIBRAS',
  robots: { index: false, follow: false },
}

export default function PortalLayout({ children }) {
  return <div className="min-h-screen bg-[#F1F2EF]">{children}</div>
}

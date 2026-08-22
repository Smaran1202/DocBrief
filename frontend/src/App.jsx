import DocumentUpload from "./components/DocumentUpload";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-12">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-teal-700">
              Document Summary Assistant
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal">
              DocuBrief AI
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              A focused workspace for turning documents into clear, useful
              summaries.
            </p>
          </div>

          <DocumentUpload />
        </div>
      </section>
    </main>
  );
}

export default App;

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
      <p className="text-xl mb-8">Discover amazing features and services!</p>
      <div className="space-x-4">
        <a
          href="/sign-up"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </a>
        <a
          href="/sign-in"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
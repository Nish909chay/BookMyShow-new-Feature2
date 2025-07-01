import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Example movie data (replace with real data if available)
  const movies = [
    { id: '1', title: 'Final Destination Bloodlines', genre: 'Comedy' },
    { id: '2', title: 'Final Destination Bloodlines', genre: 'Comedy' },
    { id: '3', title: 'Final Destination Bloodlines', genre: 'Comedy' },
    { id: '4', title: 'Final Destination Bloodlines', genre: 'Comedy' },
    { id: '5', title: 'Final Destination Bloodlines', genre: 'Comedy' },
  ];
  return (
    <main className="min-h-screen w-full bg-[#f1eeea] text-[#323031]">
      {/* Header/Navbar */}
      <div className="w-full border-b border-gray-200 sticky top-0 bg-white z-30">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
          <div className="flex items-center gap-2">
            <img src="../logo.png" alt="BookMyShow Logo" className="h-8" />
            <span className="font-bold text-lg ml-2">Pune</span>
          </div>
          <div className="flex gap-6">
            <span className="hidden md:block">Movies</span>
            <span className="hidden md:block">Stream</span>
            <span className="hidden md:block">Events</span>
            <span className="hidden md:block">Plays</span>
            <span className="hidden md:block">Sports</span>
            <span className="hidden md:block">Activities</span>
          </div>
          <div>
            <button className="rounded bg-[#c84d38] text-white px-4 py-2 font-medium">Sign In</button>
          </div>
        </div>
      </div>
      {/* Hero/Banner */}
      <div className="w-full bg-gradient-to-r from-[#c84d38] to-[#7a4e40] h-52 flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl text-white font-black">Welcome to BookMyShow Pune</h1>
      </div>
      {/* Recommended Movies Carousel */}
      <section className="container mx-auto mt-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Recommended Movies</h2>
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {/* Clickable movie cards */}
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="min-w-[200px] bg-white rounded-lg shadow hover:scale-105 transition transform block">
              <div className="h-72 w-full bg-gray-200 rounded-t-md overflow-hidden">
                <Image
                  src="https://assets-in.bmscdn.com/iedb/movies/images/extra/vertical_logo/mobile/thumbnail/xxlarge/final-destination-bloodlines-et00432143-1749816699.jpg"
                  alt="Movie Poster"
                  width={400}
                  height={288}
                  className="object-cover h-72 w-full"
                  priority
                />
              </div>
              <div className="p-2">
                <div className="font-bold text-lg">{movie.title}</div>
                <div className="text-xs text-gray-500">{movie.genre}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Banner Image after Recommended Movies */}
      <div className="container mx-auto flex justify-center my-8">
        <div className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl rounded">
          <Image
            src="/posters/imag.avif"
            alt="Promotional Banner"
            width={873}
            height={73}
            style={{ width: '873px', height: '72.75px' }}
            className="rounded shadow"
            priority
          />
        </div>
      </div>
      {/* Discovery/Genres/Languages/Sports Sections */}
      <section className="w-full bg-[#748ca3] py-8 mt-12">
        <div className="container mx-auto flex justify-center items-center">
          <p className="italic text-white text-center max-w-2xl text-lg leading-relaxed">
            This website is a personal project inspired by a missing feature on BookMyShow. Currently, there is no reminder system for upcoming movie bookings. If someone mistakenly books a ticket for the wrong time or day, they often realize it too late — after the show — when cancellation and refunds are no longer possible.<br /><br />
            I've personally faced this issue, which led me to build a feature that sends an SMS reminder 3 hours before the movie. This gives users enough time to either cancel or prepare to reach the theater — avoiding unnecessary losses.<br /><br />
            An SMS is chosen for its simplicity and effectiveness — it’s hard to miss, even if you're not actively using the app.
          </p>
        </div>
      </section>
      {/* Call-to-Action Banner */}
      <section className="container mx-auto my-12">
        
      </section>
      {/* Footer */}
      <footer className="w-full bg-[#323031] text-white py-8 mt-12">
        <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4">
          <div className="text-sm">&copy; 2025 BookMyShow Clone.</div>
          <div className="flex gap-6">
            <span>About</span>
            <span>Contact</span>
            <span>Privacy Policy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

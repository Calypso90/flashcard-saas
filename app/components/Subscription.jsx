import React from "react";

function Subscription() {
  return (
    <section className="min-h-100vh flex flex-col items-center justify-center">
      <h1>Subscriptions</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        magnam provident nihil repudiandae doloremque vero, labore eveniet
        repellendus, earum officia explicabo nemo fuga maiores sapiente odit
        architecto. Animi quo fuga expedita adipisci assumenda culpa, totam in
        eum facere id perspiciatis illum non beatae officiis eaque consectetur
        aspernatur mollitia a aliquid maiores minus ea. Quasi pariatur sint
        asperiores provident, nemo magni! Qui veritatis perferendis minus
        officiis aperiam! Enim repellendus placeat ducimus reprehenderit eveniet
        atque tenetur voluptatem perferendis rem necessitatibus alias nam est
        illum, veniam sit doloremque assumenda ratione? Assumenda adipisci
        molestias nihil, tempore delectus dolorum quo iusto eaque, similique
        eveniet itaque.
      </p>

      <div className="flex w-full gap-6 justify-center">
        <div className="flex flex-col items-center justify-evenly border border-2 border-blue-900 rounded-lg max-w-52 p-4">
          <h2>Free</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, magnam?
            <ul>
                <li>Create 1 set per category</li>
                <li>Buy sets</li>
                <li>Create your own flashcard set manually</li>
                <li>Limited free sets</li>
                <li>3 AI Tutor sessions per month</li>
            </ul>
          </p>
          <p>Free</p>
        </div>
        <div className="flex flex-col items-center justify-center border border-2 border-blue-900 rounded-lg max-w-52 p-4">
          <h2>Premium</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, consequuntur.
            <ul>
                <li>Everything from free</li>
                <li>Create unlimited sets</li>
                <li>Create flashcard sets with AI</li>
                <li>Access to all sets</li>
                <li>Unlimited AI Tutor sessions</li>
            </ul>
          </p>
          <h2>$10/month</h2>
          <button>Upgrade</button>
        </div>
      </div>
    </section>
  );
}

export default Subscription;

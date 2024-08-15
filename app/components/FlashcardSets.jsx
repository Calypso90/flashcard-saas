import React from "react";

function FlashcardSets() {
  return (
    <>
      <header className="w-full flex flex-col items-center gap-4">
        <h1>Flashcard Sets</h1>
        <p>Here you can view all the flashcard sets.</p>
        <form className="">
          <input type="text" placeholder="Search for a set" />
          <button>Filter</button>
          <button>Search</button>
        </form>
      </header>
      <section className="flex flex-col items-center mt-8">
        <h1>Best Sellers</h1>
        <div className="flex gap-4">
          <div>
            <h2>Set Name</h2>
            <p>Category</p>
            <p>Price</p>
            <button>View</button>
          </div>
          <div>
            <h2>Set Name</h2>
            <p>Category</p>
            <p>Price</p>
            <button>View</button>
          </div>
          <div>
            <h2>Set Name</h2>
            <p>Category</p>
            <p>Price</p>
            <button>View</button>
          </div>
          <div>
            <h2>Set Name</h2>
            <p>Category</p>
            <p>Price</p>
            <button>View</button>
          </div>
          <div>
            <h2>Set Name</h2>
            <p>Category</p>
            <p>Price</p>
            <button>View</button>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center mt-8">
        <h1>Free</h1>
        <div className="flex gap-4">
          <div>
            <h2>Set Name</h2>
            <p>Category</p>
            <p>Price</p>
            <button>View</button>
          </div>
          <div>
            <h2>Set Name</h2>
            <p>Category</p>
            <p>Price</p>
            <button>View</button>
          </div>
          <div>
            <h2>Set Name</h2>
            <p>Category</p>
            <p>Price</p>
            <button>View</button>
          </div>
          <div>
            <h2>Set Name</h2>
            <p>Category</p>
            <p>Price</p>
            <button>View</button>
          </div>
          <div>
            <h2>Set Name</h2>
            <p>Category</p>
            <p>Price</p>
            <button>View</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default FlashcardSets;

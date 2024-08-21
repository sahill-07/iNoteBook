import React, { useContext, useState } from "react";
import NotesContext from "../Context/notes/NotesContext";
const Home = () => {
  const context = useContext(NotesContext);
  const { notes, setnotes } = context;

  return (
    <div className="mx-auto mt-24 flex flex-col gap-10 justify-center items-center ">
      <h1 className="font-semibold text-xl">Add a Note</h1>  
      <div className="w-full md:w-1/3">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="name"
        >
          Title
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Enter a title"
          id="name"
        ></input>
      </div>
      <div className="w-full md:w-1/3">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="name"
        >
          Description
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Enter a Description"
          id="name"
        ></input>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Note</button>
      <h1 className="font-semibold text-xl">Your Notes</h1> 
      {notes.map((item) => {
        return <h1>{item.title}</h1>
      })}
    </div>
  );
};

export default Home;

import Image from "next/image";
{/* <h1>​</h1> */ }
export default function Home() {
  return (
    <div className="w-full min-h-screen bg-blue-100">
      <div className="flex flex-row px-24 py-4 justify-between sm:flex-row bg-red-500">
        <h1>
          Headertest
        </h1>
        <div className="flex flex-row gap-4 px-24">
          <h1>
            Button1
          </h1>
          <h1>
            Button2
          </h1>
          <h1>
            Button3
          </h1>
          <h1>
            Button4
          </h1>
        </div>
      </div>
      <p className="px-20 pt-15">
        Title
      </p>
      <p className="px-20 pt-5">
        test example lorem ipsum
      </p>
    </div>
  );
}

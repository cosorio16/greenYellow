function Aside() {
  return (
    <aside className="border max-h-screen min-h-screen w-64 flex flex-col items-center p-4 gap-8">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="logo w-32 h-32 rounded-full border bg-green-300"></div>
        <h1 className="text-xl  font-medium text-gray-800 tracking-wide">
          Green Yellow
        </h1>
      </div>
      <nav className=" grow w-full p-2 flex flex-col ">
        <div className="flex flex-col gap-4">
          <button className="text-xl border w-full text-start font-medium flex items-center gap-2 p-2">
            <svg width="25" height="25" viewBox="0 0 256 256">
              <path
                fill="currentColor"
                d="M104 40H56a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 64H56V56h48zm96-64h-48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 64h-48V56h48zm-96 32H56a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16m0 64H56v-48h48zm96-64h-48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16m0 64h-48v-48h48z"
              />
            </svg>
            Dashboard
          </button>
          <button className="text-xl border w-full text-start font-medium flex items-center gap-2 p-2">
            <svg width="25" height="25" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M8 2a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0V2.75A.75.75 0 0 1 8 2m2.75 2a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75M6 4.75a.75.75 0 0 0-1.5 0v6.5a.75.75 0 0 0 1.5 0zM13.75 6a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75M3 6.75a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0z"
              />
            </svg>
            Medidor 1
          </button>
          <button className="text-xl border w-full text-start font-medium flex items-center gap-2 p-2">
            <svg width="25" height="25" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M8 2a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0V2.75A.75.75 0 0 1 8 2m2.75 2a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75M6 4.75a.75.75 0 0 0-1.5 0v6.5a.75.75 0 0 0 1.5 0zM13.75 6a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75M3 6.75a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0z"
              />
            </svg>
            Medidor 2
          </button>
          <button className="text-xl border w-full text-start font-medium flex items-center gap-2 p-2">
            <svg width="25" height="25" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M8 2a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0V2.75A.75.75 0 0 1 8 2m2.75 2a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75M6 4.75a.75.75 0 0 0-1.5 0v6.5a.75.75 0 0 0 1.5 0zM13.75 6a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75M3 6.75a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0z"
              />
            </svg>
            Sensores
          </button>
        </div>

        <div className="grow flex flex-col gap-2 justify-end">
          <button className="text-xl border w-full text-start font-medium flex items-center gap-2 p-2">
            <svg width="25" height="25" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
              </g>
            </svg>
            Configuracion
          </button>
          <button className="text-xl border w-full text-start font-medium flex items-center gap-2 p-2">
            <svg width="25" height="25" viewBox="0 0 24 24">
              <path fill="currentColor" d="M16 13v-2H7V8l-5 4l5 4v-3z" />
              <path
                fill="currentColor"
                d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2"
              />
            </svg>
            Salir
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default Aside;
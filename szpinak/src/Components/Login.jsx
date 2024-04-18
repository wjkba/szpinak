// to jest placeholder
// todo:
//   - napraw css
//   - nie dodawaj register dopoki nie skonczys css
//   - skopiuj login na register
export default function Login() {
  return (
    <>
      <div className="grid place-items-center bg-szpgray min-h-screen">
        <div className="h-screen rounded gird place-content-center  w-full bg-white p-4">
          <div className="grid place-items-center">
            <div className="mb-8">
              <img src="/images/szpinak-logo-login.png" alt="" />
            </div>
            <div className="grid gap-2 place-items-center">
              <div className="grid gap-2 mb-4">
                <input
                  className="bg-red p-1 rounded border-2 border-[#214e9c]/14"
                  placeholder="Username"
                />
                <input
                  className="bg-red p-1 rounded border-2 border-[#214e9c]/14"
                  placeholder="Password"
                />
              </div>
              <button className="rounded p-2 bg-[#3F3D56] text-white w-full">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

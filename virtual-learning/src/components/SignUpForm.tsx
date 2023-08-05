import { TextField } from "@mui/material"
import Image from "next/image"
import Button from "./Button"

export const SignUpForm = () => {
  return (
    <div
      className='bg-white opacity-80 pb-[36px] px-[24px] border-solid border-[1px] rounded-md
      border-slater-200 flex flex-col itens-center'
    >
      <Image
        src="/logo.svg"
        alt="Vercel Logo"
        className="m-[45px]"
        width={350}
        height={100}
        priority
      />
      <TextField
        className="my-[12px]"
        id="outlined-basic"
        required
        label="Email"
        variant="outlined"
      />
      <TextField
        className="my-[12px]"
        id="outlined-basic"
        required
        label="Password"
        variant="outlined"
      />
      <TextField
        className="my-[12px]"
        id="outlined-basic"
        required
        label="Confirm password"
        variant="outlined"
      />
      <Button
      >
        Sign-up
      </Button>
    </div>
  )
}
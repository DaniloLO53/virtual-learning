import { CircularProgress } from '@mui/material';

export default function MainLoading() {
  return (
    <div className="min-w-[100vw] min-h-[100vh] flex items-center justify-center">
      <CircularProgress  />
    </div>
  )
}
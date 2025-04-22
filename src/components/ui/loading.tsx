import { TrophySpin } from "react-loading-indicators";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <TrophySpin
        color="#5235eb"
        size="large"
        text="Loading..."
        textColor="#000000"
      />
    </div>
  );
}

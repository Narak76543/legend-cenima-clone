const loginBackdropStyle = {
  backgroundImage: "linear-gradient(135deg, rgba(15, 23, 42, 0.84), rgba(30, 41, 59, 0.68)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
} as const

const loginCardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.94)",
  borderColor: "rgba(203, 213, 225, 0.9)",
} as const

export const useAuthPageStyles = () => ({
  loginBackdropStyle,
  loginCardStyle,
})

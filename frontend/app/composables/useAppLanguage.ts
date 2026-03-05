export type AppLanguage = "en"

const messages = {
  en: {
    common: {
      stockflow    : "StockFlow",
      inventory    : "Inventory",
      management   : "Management",
      orContinue   : "Or continue",
      terms        : "Terms",
      privacyPolicy: "Privacy Policy",
      signOut      : "Sign Out",
    },
    auth: {
      adminConsole       : "Admin Console",
      signIn             : "Sign in",
      accessSecurely     : "Access your dashboard securely.",
      email              : "Email",
      password           : "Password",
      rememberMe         : "Remember me",
      days30             : "30 days",
      use8Chars          : "Use at least 8 characters.",
      tooShort           : "Too short - add more characters.",
      looksGood          : "Looks good.",
      welcomeBack        : "Welcome back. Redirecting...",
      invalidCredentials : "Invalid credentials. Please try again.",
      signingIn          : "Signing in...",
      signInWithSso      : "Sign in with SSO",
      createAccount      : "Create account",
      createAdminAccount : "Create an admin account with your personal details.",
      fullName           : "Full Name",
      jobTitle           : "Job Title",
      phone              : "Phone",
      bio                : "Bio",
      profileImage       : "Profile Image",
      uploadPhoto        : "Upload photo",
      switchToRegister   : "Need an account? Register",
      switchToSignIn     : "Already have an account? Sign in",
      registering        : "Creating account...",
      registrationSuccess: "Account created. Redirecting...",
      invalidImage       : "Please choose a valid image file.",
      agreePrefix        : "By continuing, you agree to our",
      and                : "and",
      secureAdminAccess  : "Secure admin access",
    },
    sidebar: {
      overview     : "Overview",
      products     : "Products",
      categories   : "Categories",
      inventory    : "Inventory",
      purchases    : "Purchases",
      sales        : "Sales",
      reports      : "Reports",
      users        : "Users",
      settings     : "Settings",
      administrator: "Administrator",
    },
    header: {
      searchPlaceholder: "Search products, SKU, invoices...",
      thisWeek         : "This week",
      thisMonth        : "This month",
    },
    dashboard: {
      salesVsPurchases   : "Sales vs Purchases",
      weeklyComparison   : "Weekly analytical comparison",
      sales              : "Sales",
      purchases          : "Purchases",
      stockByCategory    : "Stock by Category",
      distribution       : "Distribution of products",
      units              : "Units",
      recentTransactions : "Recent Transactions",
      viewAll            : "View all",
      type               : "Type",
      reference          : "Reference",
      amount             : "Amount",
      date               : "Date",
      status             : "Status",
      lowStockProducts   : "Low Stock Products",
      requiresAttention  : "Requires immediate attention",
      reorder            : "Reorder",
      manageAlerts       : "Manage Alerts",
      totalSalesToday    : "Total Sales (Today)",
      totalPurchasesToday: "Total Purchases (Today)",
      netProfitToday     : "Net Profit (Today)",
      lowStockAlerts     : "Low Stock Alerts",
      vsYesterday        : "vs yesterday",
      since8am           : "since 8AM",
    },
    settings: {
      title              : "Settings",
      description        : "Configure your application preferences.",
      lightMode          : "Light Mode",
      lightDescription   : "Bright surfaces with high contrast for daytime work.",
      darkMode           : "Dark Mode",
      darkDescription    : "Low-glare surfaces with softer contrast for late hours.",
      quickToggle        : "Quick Toggle",
      currentTheme       : "Current theme",
      switchToLight      : "Switch to Light Mode",
      switchToDark       : "Switch to Dark Mode",
      profileTitle       : "Admin Profile",
      profileDescription : "Manage your personal information and profile image.",
      accountEmail       : "Account email",
      roleLabel          : "Role",
      saveProfile        : "Save profile",
      savingProfile      : "Saving...",
      profileSaved       : "Profile updated successfully.",
      languageRemoved    : "Interface language is fixed to English.",
    },
  },
} as const

const getMessage = (language: AppLanguage, path: string) => {
  const segments = path.split(".")
  let current: any = messages[language]

  for (const segment of segments) {
    current = current?.[segment]
  }

  return typeof current === "string" ? current : path
}

export const useAppLanguage = () => {
  const language = computed<AppLanguage>(() => "en")

  const setLanguage = (_value: AppLanguage) => {}

  const t = (path: string) => getMessage(language.value, path)

  const isKhmer = computed(() => false)

  return {
    language,
    isKhmer,
    setLanguage,
    t,
  }
}

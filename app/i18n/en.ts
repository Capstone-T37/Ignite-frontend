const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  signInScreen: {
    signIn: "Sign In",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    userNameFieldLabel: "Username",
    passwordFieldLabel: "Password",
    userNameFieldPlaceholder: "Enter your username address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToSignIn: "Tap to sign in!",
    tapToSignUp: "sign up",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  homeNavigatorTab: {
    homeTab: "Home",
    activityTab: "Activities",
    connectedTab: "Connected",
    chatTab: "Chat",
    porfileTab:"Profile"

  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  ActivityScreen: {
    title: "Connect with the community",
    tagLine: "Explore diverse activities, connect with others, and create memorable moments!",
    joinButtonContent: "Join!",
    emptyStateHeading: "Dang!",
    emptyStateContent: "No activities are found at the moment. Try clicking on the button to refresh",
  },
  ActivityDetailsScreen: {
    joinButton: "Join Activity!",
    emptyStateHeading: "Dang!",
    emptyStateContent: "Something wrong happened to the activity",
    emptyStateButton: "Go back!"
  },
  ConnectedScreen: {
    title: "Connecting Now",
    tagLine: "Discover Users Eager to Meet Instantly!",
    meetButtonText: "Meet!",
    goLiveButtonText: "Go live?",
    stopButtonText: "Stop?",
    emptyStateHeading: "Dang!",
    emptyStateContent: "No one is connected at the moment.",
    requestsTitle: "Requests!"
  },
  ActivityForm: {
    Title: "Create your Activity",
    Submit: "Submit",
    SnackBarText: "Activity created successfully !"
  },
  MeetForm: {
    Title: "Go Live!",
    SnackBarTextSuccess: "Meet created successfully !"
  },
  UsersListScreen: {
    title: "Proximity chats",
    tagLine: "Chat with people nearby!",
    meetButtonText: "Meet!",
    goLiveButtonText: "Go live?",
    stopButtonText: "Stop?",
    emptyStateHeading: "Dang!",
    emptyStateContent: "No one is connected at the moment.",
  },
  DefaultModalContent: {
    buttonText: "Send Request!"
  }
}

export default en
export type Translations = typeof en

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.quetalelpuente.ggcode',
  appName: 'Que tal el puente',
  webDir: 'www',
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-9253092378386410~1104983823',
      requestTrackingAuthorization: true,
      testingDevices: [],
      initializeForTesting: false, // Set to false for production
    },
  },
};

export default config;

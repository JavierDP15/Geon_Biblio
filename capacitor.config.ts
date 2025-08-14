import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.geonBiblio',
  appName: 'Geon_Biblio',
  webDir: 'www',
  plugins: {
    SplashSceen: {
      launcShowDuration: 3000,
      autoHide: false
    }
  }
};

export default config;

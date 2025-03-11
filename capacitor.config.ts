
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5571cb7bf8554e04a330ed2b9df6adc4',
  appName: 'daily-brew-amount',
  webDir: 'dist',
  server: {
    url: 'https://5571cb7b-f855-4e04-a330-ed2b9df6adc4.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystoreAlias: null,
      keystorePassword: null,
      keystoreAliasPassword: null,
      releaseType: null,
    }
  }
};

export default config;

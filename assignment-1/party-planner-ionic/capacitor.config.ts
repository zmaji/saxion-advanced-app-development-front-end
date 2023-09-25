import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'party-planner-ionic',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Contacts: {
      permissions: ['android.permission.READ_CONTACTS', 'android.permission.WRITE_CONTACTS']
    }
  }
};

export default config;
import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.text}>
          Effective date: [Insert Date]
        </Text>
        <Text style={styles.text}>
          This Privacy Policy explains how we collect, use, and protect your personal information when you use our app.
        </Text>

        <Text style={styles.heading}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We collect personal information, including but not limited to your email address, when you sign up or use our services.
        </Text>

        <Text style={styles.heading}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use your information to provide, personalize, and improve our services, as well as communicate with you regarding your account and updates.
        </Text>

        <Text style={styles.heading}>3. Data Storage and Security</Text>
        <Text style={styles.text}>
          We use secure storage and encryption to protect your personal information. However, no method of transmission over the internet is 100% secure.
        </Text>

        <Text style={styles.heading}>4. Third-Party Services</Text>
        <Text style={styles.text}>
          We do not share your personal data with third parties unless necessary to provide the services you requested or as required by law.
        </Text>

        <Text style={styles.heading}>5. Your Rights</Text>
        <Text style={styles.text}>
          You have the right to access, correct, or delete your personal information. You may also opt-out of certain data collection practices by contacting us.
        </Text>

        <Text style={styles.heading}>6. Changes to This Privacy Policy</Text>
        <Text style={styles.text}>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
        </Text>

        <Text style={styles.heading}>7. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or concerns about this Privacy Policy, please contact us at [Your Contact Email].
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  content: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: 'green',
  },
});

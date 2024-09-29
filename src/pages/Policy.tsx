const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
        <p className="text-gray-600">
          Thank you for using JobShop! This Privacy Policy explains how we
          collect, use, and disclose personal information when you use our job
          recruitment app (the Service).
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          1. Information We Collect
        </h2>
        <p className="text-gray-600">
          <strong>Personal Information:</strong> When you register an account
          with us, we collect personal information such as your name, email
          address, phone number, and resume. We may also collect additional
          information you choose to provide, such as your education and work
          history.
        </p>
        <p className="text-gray-600">
          <strong>Usage Data:</strong> We collect information about how you use
          the Service, including your interactions with job postings, searches,
          and messages sent through the app.
        </p>
        <p className="text-gray-600">
          <strong>Device Information:</strong> We automatically collect device
          information such as your IP address, device type, operating system,
          and browser type.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          2. Data Collection and Use
        </h2>
        <p className="text-gray-600">
          We collect personal information only when it is necessary to provide
          the core functionality of our app or as required by law. To use
          key features of our app, such as posting or applying for jobs,
          account creation and sign-in are required. These features are integral
          to the core functionality of the app, and personal information such as
          your email, name, and contact details will be necessary to create and
          manage your account.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          3. Social Network Integration
        </h2>
        <p className="text-gray-600">
          If our app integrates with social networks such as Facebook, Twitter,
          WeChat, or others, you are not required to sign in with these networks
          to use the app. You may opt to log in using an alternate mechanism.
        </p>
        <p className="text-gray-600">
          <strong>Revoking Access:</strong> You can revoke access to social
          network accounts and disable data sharing between the app and the
          social network from within the app at any time.
        </p>
        <p className="text-gray-600">
          <strong>Data Usage:</strong> The app uses social network credentials
          or tokens only during active sessions and does not store them off the
          device. The tokens are used solely for connecting to the social
          network while the app is in use, ensuring your data is kept secure and
          confidential.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          4. Information Sharing and Disclosure
        </h2>
        <p className="text-gray-600">
          We do not share your personal information with third parties except
          when necessary for the core functionality of the app or to comply with
          legal obligations.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          5. Data Security
        </h2>
        <p className="text-gray-600">
          We implement strict security measures to protect your information from
          unauthorized access or disclosure. Your data is stored securely, and
          any information transmitted between the app and our servers is
          encrypted. However, no method of transmission over the internet or
          electronic storage is 100% secure, so we cannot guarantee absolute
          security.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">6. Your Rights</h2>
        <p className="text-gray-600">
          You have the right to access, correct, or delete your personal
          information within the app. You can also disable any social network
          connections and revoke permissions granted to third-party services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          7. Account Deletion
        </h2>
        <p className="text-gray-600">
          We offer the option to delete your account directly within the app.
          Upon deletion, all related personal information, including job
          postings, applications, and associated data, will be permanently
          removed from our systems, unless retention is required by law.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">
          8. Changes to this Privacy Policy
        </h2>
        <p className="text-gray-600">
          We may update this Privacy Policy from time to time to reflect changes
          in our data practices or legal requirements. We will notify you of any
          material changes by posting the updated policy on our website or
          through other communication channels.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">9. Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at{" "}
          <a
            href="mailto:jobshop@gmail.com"
            className="text-blue-600 hover:underline"
          >
            jobshop@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

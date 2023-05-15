import { Mumbai } from '@thirdweb-dev/chains';
import {
  ThirdwebProvider,
  metamaskWallet,
  magicLink,
  coinbaseWallet,
  walletConnect
} from '@thirdweb-dev/react';

// import { MagicConnector } from '@thirdweb-dev/react/evm/connectors/magic';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PageLoader from './components/common/PageLoader';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { AUTH_DOMAIN, AUTH_URL } from './utils/url';

const NewContract = lazy(() => import('@/pages/contracts/createContract'));
const ViewContract = lazy(() => import('@/pages/contracts/viewContract'));
const Freelancer = lazy(() => import('@/pages/dashboards/freelancer'));
const Client = lazy(() => import('@/pages/dashboards/client'));
const MainDashboard = lazy(() => import('@/pages/dashboards/mainDashboard'));
const FreelancerProfile = lazy(() => import('@/pages/profiles/freelancer'));
const ClientProfile = lazy(() => import('@/pages/profiles/client'));
const Templates = lazy(() => import('@/pages/templates/viewTemplates'));
const NewTemplate = lazy(() => import('@/pages/templates/createTemplate'));
const WelcomePage = lazy(() => import('@/pages/onboarding/welcome'));
const SignupPage = lazy(() => import('@/pages/onboarding/signup'));

function App() {
  // const magicLinkConnector = new MagicConnector({
  //   options: {
  //     apiKey: 'pk_live_8C4442FA1CF3E6A8',
  //     rpcUrls: {
  //       [ChainId.Mumbai]:
  //         'https://polygon-mumbai.g.alchemy.com/v2/jBx23SN98GD4nuzB1Mw-M5Z5QK5fXSY9'
  //     }
  //   }
  // });
  return (
    <ThirdwebProvider
      // walletConnectors={[
      //   magicLinkConnector,
      //   'metamask',
      //   'walletConnect',
      //   'coinbase'
      // ]}

      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        magicLink({
          apiKey: 'pk_live_8C4442FA1CF3E6A8'
        })
      ]}
      activeChain={{
        ...Mumbai,
        rpc: [
          'https://polygon-mumbai.g.alchemy.com/v2/jBx23SN98GD4nuzB1Mw-M5Z5QK5fXSY9'
        ]
      }}
      authConfig={{
        domain: AUTH_DOMAIN,
        authUrl: AUTH_URL
      }}
      autoConnect
      dAppMeta={{
        name: 'Layers',
        description: 'Layers foundation',
        // logoUrl: 'https://example.com/logo.png',
        url: 'https://layers.foundation',
        isDarkMode: true
      }}
    >
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/welcome/signup" element={<SignupPage />} />
            <Route path="/" element={<MainDashboard />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/template/new" element={<NewTemplate />} />
            <Route path="freelancer/:slug" element={<Freelancer />} />
            <Route path="/escrow/:slug" element={<Client />} />
            <Route path="/dashboard/freelancer" element={<Freelancer />} />
            {/* <Route path="/client" element={<Client />} /> */}
            <Route path="/profile/freelancer" element={<FreelancerProfile />} />
            <Route path="/profile/client" element={<ClientProfile />} />

            {/* <Route
              path="/template/:slug"
              element={
                <ProtectedRoute>
                  <Template />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/contract/new"
              element={
                // <ProtectedRoute>
                <NewContract />
                // </ProtectedRoute>
              }
            />

            <Route
              path="/contract/:slug"
              element={
                // <ProtectedRoute>
                <ViewContract />
                // </ProtectedRoute>
              }
            />

            <Route
              path="/my-contracts"
              element={
                <ProtectedRoute>
                  <MainDashboard />
                  {/* <MyContracts /> */}
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/contractold/:slug"
              element={
                <ProtectedRoute>
                  <Contract />
                </ProtectedRoute>
              }
            />
            <Route
              path="/from-template/:slug"
              element={
                <ProtectedRoute>
                  <FromTemplate />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </Suspense>
      </Router>
    </ThirdwebProvider>
  );
}

export default App;


import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, UsersLayout } from './components';
import MainLayout from './components/MainLayout';
import { Dashboard } from './components/pages/dashboard';
import { ConfigurationsLayouts } from './components/pages/configuration/ConfigurationsLayouts';
import { Blockchains } from './components/pages/configuration/blockchains/blockchains';
import { BlockchainDetailsLayout } from './components/pages/configuration/blockchains/details';
import { ListUsersPage } from './components/pages/users/users-list';
import { Currencies } from './components/pages/configuration/currencies/Currencies';
import { CurrencyDetailsLayout } from './components/pages/configuration/currencies/details/CurrencyDetailsLayout';
import { Wallets } from './components/pages/configuration/wallets/Wallets';
import { WalletDetailsLayout } from './components/pages/configuration/wallets/details/WalletDetailsLayout';
import { Markets } from './components/pages/configuration/markets/Markets';
import { MarketDetailsLayout } from './components/pages/configuration/markets/details';
import { FeesSchedule } from './components/pages/configuration/feesSchedule/FeesSchedule';
import { OperationsLayout } from './components/pages/operations/OperationsLayout';
import { Deposits } from './components/pages/operations/Deposits/Deposits';
import { DepositDetails } from './components/pages/operations/Deposits/depositDetails';
import { Trades } from './components/pages/operations/trades';
import { BusinessAnalytics } from './components/pages/operations/business-analytics';
import { Orders } from './components/pages/operations/orders';
import { Adjustments } from './components/pages/operations/adjustments';
import { AdjustmentDetails } from './components/pages/operations/adjustments/AdjustmentDetails';
import { useSelector } from 'react-redux';
import { Login } from './modules';
import { useEffect, useState } from 'react';
import { UserDetailsLayout } from './components/pages/users/users-list/user-details';
import { Withdrawals } from './components/pages/operations/withdrawals/Withdrawals';
import { WithdrawalDetails } from './components/pages/operations/withdrawals/WithdrawalDetails';
import { PendingWithdrawals } from './components/pages/operations/pending-withdrawals';
import { DevopsLayout } from './components/pages/devops';
import { UserPermissions } from './components/pages/devops/user-permissions';
import { Application } from './components/pages/users/applications';
import { UserDetailsActivities } from './components/pages/users/users-list/user-details/activities';




function App() {
  const Logins = useSelector(Login);

  const [IsLogin, setIsLogin] = useState()
  useEffect(() => {
    setIsLogin(sessionStorage.getItem('login'))
  }, [Logins])
  return (
    <MainLayout>

      <Routes>
        {IsLogin ?
          <>
            <Route path='/' element={<Dashboard />} />
            <Route path='/users' element={
              <UsersLayout >
                <ListUsersPage />
              </UsersLayout>

            } />
            <Route path='/users/details/:uid' element={
              <UsersLayout>
                < UserDetailsLayout />
              </UsersLayout>
            } />
            <Route path='/users/applications' element={
              <UsersLayout>
                < Application />
              </UsersLayout>
            } />
            <Route path='/users/activities' element={
              <UsersLayout>
                < UserDetailsActivities />
              </UsersLayout>
            } />


            <Route path='/configuration' element={
              <ConfigurationsLayouts >
                <Blockchains />
              </ConfigurationsLayouts>}
            />
            <Route path='/configuration/blockchains/' element={
              <ConfigurationsLayouts >
                <Blockchains />
              </ConfigurationsLayouts>}
            />
            <Route path='/configuration/blockchains/info/:id'
              element={
                <ConfigurationsLayouts>
                  <BlockchainDetailsLayout />
                </ConfigurationsLayouts>
              }
            />
            <Route path='/configuration/currencies' element={
              <ConfigurationsLayouts>
                <Currencies />
              </ConfigurationsLayouts>
            } />
            <Route path='/configuration/currencies/details/:id' element={
              <ConfigurationsLayouts>
                <CurrencyDetailsLayout />
              </ConfigurationsLayouts>
            } />
            <Route path='/configuration/wallets' element={
              <ConfigurationsLayouts>
                <Wallets />
              </ConfigurationsLayouts>
            }
            />
            <Route path='/configuration/wallets/details/:id' element={
              <ConfigurationsLayouts>
                <WalletDetailsLayout />
              </ConfigurationsLayouts>
            }
            />
            <Route path='/configuration/markets' element={
              <ConfigurationsLayouts>
                <Markets />
              </ConfigurationsLayouts>
            }
            />
            <Route path='/configuration/markets/details/:id' element={
              <ConfigurationsLayouts>
                <MarketDetailsLayout />
              </ConfigurationsLayouts>
            }
            />
            <Route path='/configuration/feesSchedule' element={
              <ConfigurationsLayouts>
                <FeesSchedule />
              </ConfigurationsLayouts>
            }
            />
            <Route path='/operations' element={
              <OperationsLayout>
                <Deposits />
              </OperationsLayout>
            }
            />
            <Route path='/operations/deposits' element={
              <OperationsLayout>
                <Deposits />
              </OperationsLayout>
            }
            />
            <Route path='/operations/deposits/details/:id' element={
              <OperationsLayout>
                <DepositDetails />
              </OperationsLayout>
            }
            />
            <Route path='/operations/trades' element={
              <OperationsLayout>
                <Trades />
              </OperationsLayout>
            }
            />
            <Route path='/operations/businessAnalytics' element={
              <OperationsLayout>
                <BusinessAnalytics />
              </OperationsLayout>
            }
            />
            <Route path='/operations/orders' element={
              <OperationsLayout>
                <Orders />
              </OperationsLayout>
            }
            />
            <Route path='/operations/adjustments' element={
              <OperationsLayout>
                <Adjustments />
              </OperationsLayout>
            }
            />
            <Route path='/operations/adjustments/details/:id' element={
              <OperationsLayout>
                <AdjustmentDetails />
              </OperationsLayout>
            }
            />
            <Route path='/operations/withdrawals' element={
              <OperationsLayout>
                <Withdrawals />
              </OperationsLayout>
            }
            />
            <Route path='/operations/withdrawals/details/:id' element={
              <OperationsLayout>
                < WithdrawalDetails />
              </OperationsLayout>
            }
            />
            <Route path='/operations/pendingWithdrawals' element={
              <OperationsLayout>
                <PendingWithdrawals />
              </OperationsLayout>
            }
            />
            <Route path='/devops' element={<DevopsLayout />} />

            <Route path='/devops/userPermissions' element={
              <DevopsLayout>
                <UserPermissions />
              </DevopsLayout>

            } />


            <Route path='*' element={<Dashboard />} />
          </> :
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path='*' element={<LoginPage />} />
          </>


        }



      </Routes>


    </MainLayout>
  );
}

export default App;

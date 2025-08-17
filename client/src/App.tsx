import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import React, { useEffect, Suspense, lazy } from "react";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import BusinessPartnerAuthPage from "@/pages/business-partner-auth";
import Dashboard from "@/pages/dashboard";

// PERFORMANCE BOOST: Lazy load heavy components
const Clients = lazy(() => import("@/pages/clients"));
const ClientDetails = lazy(() => import("@/pages/client-details"));
const Services = lazy(() => import("@/pages/services"));
const SimplifiedServices = lazy(() => import("@/pages/simplified-services"));
const BasicServicesPage = lazy(() => import("@/pages/basic/services"));
const EnhancedServices = lazy(() => import("@/pages/enhanced-services"));
const AdminServices = lazy(() => import("@/pages/admin/services"));
const CreateService = lazy(() => import("@/pages/admin/create-service"));
const AdminClients = lazy(() => import("@/pages/admin/clients"));
const AdminSpareParts = lazy(() => import("@/pages/admin/spare-parts"));
const AdminAvailableParts = lazy(() => import("@/pages/admin/available-parts"));
const AdminSparePartsCatalogPage = lazy(() => import("@/pages/admin/spare-parts-catalog"));
const AdminWebScrapingPage = lazy(() => import("@/pages/admin/web-scraping"));
const SuppliersPage = lazy(() => import("@/pages/admin/suppliers"));
const PartsCatalogPage = lazy(() => import("@/pages/admin/parts-catalog"));
const Appliances = lazy(() => import("@/pages/appliances"));
const Users = lazy(() => import("@/pages/users"));
const UserProfile = lazy(() => import("@/pages/user-profile"));
const TechnicianServicesMobile = lazy(() => import("@/pages/technician/services-mobile"));
const TechnicianProfile = lazy(() => import("@/pages/technician/profile"));
const TechnicianMyProfile = lazy(() => import("@/pages/technician/my-profile"));
const TechnicianNotifications = lazy(() => import("@/pages/technician/notifications"));
const TechnicianSettings = lazy(() => import("@/pages/technician/settings"));
const TechnicianHelp = lazy(() => import("@/pages/technician/help"));
const TechnicianContact = lazy(() => import("@/pages/technician/contact"));
const TechnicianServicesList = lazy(() => import("@/pages/technician-services"));
const CreateTechnicianUser = lazy(() => import("@/pages/create-technician-user"));
const MaintenanceSchedules = lazy(() => import("@/pages/maintenance-schedules"));
const EmailSettings = lazy(() => import("@/pages/email-settings"));

const SQLAdmin = lazy(() => import("@/pages/sql-admin"));
const ExcelImportExport = lazy(() => import("@/pages/excel-import-export"));
const ExcelImport = lazy(() => import("@/pages/admin/excel-import"));
const UserVerification = lazy(() => import("@/pages/admin/user-verification"));
// SMS functionality has been completely removed from the application
import { ProtectedRoute } from "./lib/protected-route";
import { RoleProtectedRoute } from "./lib/role-protected-route";
import { initializeCapacitor, isNativeMobile } from "./capacitor";
import { NotificationProvider } from "@/contexts/notification-context";

// PERFORMANCE BOOST: Lazy load customer pages
const CustomerServiceRequest = lazy(() => import("@/pages/customer"));
const CustomerProfile = lazy(() => import("@/pages/customer/profile"));
const CustomerServices = lazy(() => import("@/pages/customer/services"));

// PERFORMANCE BOOST: Lazy load business partner pages  
const BusinessDashboard = lazy(() => import("@/pages/business"));
const BusinessProfile = lazy(() => import("@/pages/business/profile"));
const BusinessServices = lazy(() => import("@/pages/business/services"));
const BusinessMessages = lazy(() => import("@/pages/business/messages"));
const NewBusinessServiceRequest = lazy(() => import("@/pages/business/services/new"));
const EditBusinessService = lazy(() => import("@/pages/business/services/edit.tsx"));
const NewBusinessClient = lazy(() => import("@/pages/business/clients/new"));
const BusinessClients = lazy(() => import("@/pages/business/clients/index-simple"));
const BusinessComplus = lazy(() => import("@/pages/business/complus"));

// PERFORMANCE BOOST: Lazy load remaining pages
import HomePage from "@/pages/home-page";
import ComplusAuthPage from "@/pages/complus-auth";
const DiagnosticsPage = lazy(() => import("@/pages/diagnostics"));
const DiagnosticServicesPage = lazy(() => import("@/pages/diagnostic-services"));
const SystemDiagnostics = lazy(() => import("@/pages/system-diagnostics"));
const EmailVerificationDemo = lazy(() => import("@/pages/email-verification-demo"));
const DataExportPage = lazy(() => import("@/pages/admin/data-export"));
const SMSMobileAPIConfigPage = lazy(() => import("@/pages/admin/sms-mobile-api-config"));
const SMSBulkPage = lazy(() => import("@/pages/admin/sms-bulk"));
const ComplusBillingPage = lazy(() => import("@/pages/admin/complus-billing"));
const BusinessPartnersAdminPageFixed = lazy(() => import("@/pages/admin/business-partners-fixed"));
const ServisKomerc = lazy(() => import("@/pages/admin/servis-komerc"));
const AIPredictiveMaintenancePage = lazy(() => import("@/pages/admin/ai-predictive-maintenance"));
const ComplusDashboard = lazy(() => import("@/pages/complus"));

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-600">Učitavam...</p>
    </div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
      {/* Public home page - novi javni homepage za sve korisnike */}
      <Route path="/" component={HomePage} />
      
      {/* Dijagnostičke stranice - javno dostupne za lakše otklanjanje grešaka */}
      <Route path="/diagnostics" component={DiagnosticsPage} />
      <Route path="/diagnostic-services" component={DiagnosticServicesPage} />
      <Route path="/system-diagnostics" component={SystemDiagnostics} />

      <Route path="/email-verification-demo" component={EmailVerificationDemo} />
      
      <Route path="/auth" component={AuthPage} />
      <Route path="/business-auth" component={BusinessPartnerAuthPage} />
      <Route path="/complus-auth" component={ComplusAuthPage} />
      
      {/* Admin routes */}
      <RoleProtectedRoute path="/admin" component={Dashboard} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/clients" component={Clients} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/clients/:id" component={ClientDetails} allowedRoles={["admin"]} />
      {/* Admin verzija servisa - zaštićena */}
      <RoleProtectedRoute path="/admin/services" component={AdminServices} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/create-service" component={CreateService} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/clients" component={AdminClients} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/spare-parts" component={AdminSpareParts} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/available-parts" component={AdminAvailableParts} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/business-partners" component={BusinessPartnersAdminPageFixed} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/spare-parts-catalog" component={AdminSparePartsCatalogPage} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/web-scraping" component={AdminWebScrapingPage} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/suppliers" component={SuppliersPage} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/parts-catalog" component={PartsCatalogPage} allowedRoles={["admin"]} />
      {/* Javne verzije servisa za testiranje */}
      <Route path="/services" component={EnhancedServices} />
      <Route path="/services-basic" component={BasicServicesPage} />
      <Route path="/services-alt" component={SimplifiedServices} />
      <Route path="/services-safe" component={React.lazy(() => import('@/pages/services-safe'))} />
      <RoleProtectedRoute path="/appliances" component={Appliances} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/users" component={Users} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/create-tech-user" component={CreateTechnicianUser} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/technician-services" component={TechnicianServicesList} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/maintenance-schedules" component={MaintenanceSchedules} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/email-settings" component={EmailSettings} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/email-test" component={EmailSettings} allowedRoles={["admin"]} />

      <RoleProtectedRoute path="/sql-admin" component={SQLAdmin} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/excel" component={ExcelImportExport} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/excel-import" component={ExcelImport} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/user-verification" component={UserVerification} allowedRoles={["admin"]} />

      <RoleProtectedRoute path="/admin/sms-mobile-api-config" component={SMSMobileAPIConfigPage} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/sms-bulk" component={SMSBulkPage} allowedRoles={["admin"]} />

      <RoleProtectedRoute path="/admin/data-export" component={DataExportPage} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/servis-komerc" component={ServisKomerc} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/complus-billing" component={ComplusBillingPage} allowedRoles={["admin"]} />
      <RoleProtectedRoute path="/admin/ai-predictive-maintenance" component={AIPredictiveMaintenancePage} allowedRoles={["admin"]} />
      
      {/* Com Plus nezavisan administrativni panel */}
      <RoleProtectedRoute path="/complus" component={ComplusDashboard} allowedRoles={["admin"]} />
      
      <RoleProtectedRoute path="/profile" component={UserProfile} allowedRoles={["admin"]} />
      

      
      {/* Technician routes */}
      <RoleProtectedRoute path="/tech" component={TechnicianServicesMobile} allowedRoles={["technician"]} />
      <RoleProtectedRoute path="/tech/profile" component={TechnicianProfile} allowedRoles={["technician"]} />
      <RoleProtectedRoute path="/tech/my-profile" component={TechnicianMyProfile} allowedRoles={["technician"]} />
      <RoleProtectedRoute path="/tech/notifications" component={TechnicianNotifications} allowedRoles={["technician"]} />
      <RoleProtectedRoute path="/tech/settings" component={TechnicianSettings} allowedRoles={["technician"]} />
      <RoleProtectedRoute path="/tech/help" component={TechnicianHelp} allowedRoles={["technician"]} />
      <RoleProtectedRoute path="/tech/contact" component={TechnicianContact} allowedRoles={["technician"]} />
      
      {/* Customer routes */}
      <RoleProtectedRoute path="/customer" component={CustomerServiceRequest} allowedRoles={["customer"]} />
      <RoleProtectedRoute path="/customer/profile" component={CustomerProfile} allowedRoles={["customer"]} />
      <RoleProtectedRoute path="/customer/services" component={CustomerServices} allowedRoles={["customer"]} />
      
      {/* Business Partner routes */}
      <RoleProtectedRoute path="/business" component={BusinessDashboard} allowedRoles={["business_partner", "business"]} />
      <RoleProtectedRoute path="/business/profile" component={BusinessProfile} allowedRoles={["business_partner", "business"]} />
      <RoleProtectedRoute path="/business/services" component={BusinessServices} allowedRoles={["business_partner", "business"]} />
      <RoleProtectedRoute path="/business/messages" component={BusinessMessages} allowedRoles={["business_partner", "business"]} />
      <RoleProtectedRoute path="/business/services/new" component={NewBusinessServiceRequest} allowedRoles={["business_partner", "business"]} />
      <RoleProtectedRoute path="/business/services/edit/:id" component={EditBusinessService} allowedRoles={["business_partner", "business"]} />
      <RoleProtectedRoute path="/business/clients/new" component={NewBusinessClient} allowedRoles={["business_partner", "business"]} />
      <RoleProtectedRoute path="/business/clients" component={BusinessClients} allowedRoles={["business_partner", "business"]} />
      <RoleProtectedRoute path="/business/complus" component={BusinessComplus} allowedRoles={["business_partner", "business"]} />
      
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [, navigate] = useLocation();
  
  // Provera da li postoji zahtev za odjavom, i ako postoji, automatski odradi redirekt
  useEffect(() => {
    const logoutRequested = localStorage.getItem("logoutRequested");
    if (logoutRequested === "true") {
      console.log("Detektovan zahtev za odjavom, preusmeravanje na stranicu za prijavu");
      localStorage.removeItem("logoutRequested");
      navigate("/auth");
    }
  }, [navigate]);
  
  // Inicijalizacija Capacitor-a prilikom učitavanja aplikacije
  useEffect(() => {
    // Inicijalizacija samo za nativne mobilne platforme
    if (isNativeMobile) {
      console.log("Inicijalizacija mobilne aplikacije...");
      initializeCapacitor().catch(error => {
        console.error("Greška pri inicijalizaciji mobilne aplikacije:", error);
      });
    }
  }, []);

  // Viewport optimizacija za Android tastature
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    
    const handleResize = () => {
      setVh();
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <NotificationProvider>
      <Router />
      <Toaster />
    </NotificationProvider>
  );
}

export default App;

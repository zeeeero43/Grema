import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Unterhaltsreinigung from "@/pages/unterhaltsreinigung";
import Fensterreinigung from "@/pages/fensterreinigung";
import Bauabschlussreinigung from "@/pages/bauabschlussreinigung";
import Entruempelung from "@/pages/entruempelung";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";

import NotFound from "@/pages/not-found";

const base = import.meta.env.PROD ? "/Grema" : "";

function Router() {
  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/unterhaltsreinigung" component={Unterhaltsreinigung} />
        <Route path="/fensterreinigung" component={Fensterreinigung} />
        <Route path="/bauabschlussreinigung" component={Bauabschlussreinigung} />
        <Route path="/entruempelung" component={Entruempelung} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />

        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

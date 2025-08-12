import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Unterhaltsreinigung from "@/pages/unterhaltsreinigung";
import GlasRahmenreinigung from "@/pages/glas-rahmenreinigung";
import Sonderreinigung from "@/pages/sonderreinigung";
import Bauabschlussreinigung from "@/pages/bauabschlussreinigung";
import Entruempelung from "@/pages/entruempelung";
import Treppenhausreinigung from "@/pages/treppenhausreinigung";
import UeberUns from "@/pages/ueber-uns";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";

import NotFound from "@/pages/not-found";

const base = "";

function Router() {
  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/unterhaltsreinigung" component={Unterhaltsreinigung} />
        <Route path="/glas-rahmenreinigung" component={GlasRahmenreinigung} />
        <Route path="/sonderreinigung" component={Sonderreinigung} />
        <Route path="/bauabschlussreinigung" component={Bauabschlussreinigung} />
        <Route path="/entruempelung" component={Entruempelung} />
        <Route path="/treppenhausreinigung" component={Treppenhausreinigung} />
        <Route path="/ueber-uns" component={UeberUns} />
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

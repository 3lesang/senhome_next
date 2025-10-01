"use client";

import { useQuery } from "@tanstack/react-query";
import { Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MENU_COLLECTION, STORE_COLLECTION } from "@/pocketbase/consts";
import { getMenuPocket } from "@/pocketbase/menu";
import { getStorePocket } from "@/pocketbase/store/one";

// Types
type MenuItem = {
  id: string;
  title: string;
  url: string;
  parentId?: string | null;
  order?: number;
  children?: MenuItem[];
};

function buildTree(
  items: MenuItem[],
  parentId: string | null = null,
): MenuItem[] {
  return items
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => ({
      ...item,
      children: buildTree(items, item.id),
    }));
}

function FooterSection({ section }: { section: MenuItem }) {
  if (!section.children?.length) return null;

  return (
    <div>
      <h4 className="font-semibold mb-4">{section.title}</h4>
      <ul className="space-y-3">
        {section.children.map((link) => (
          <li key={link.id}>
            <a
              href={link.url || "#"}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const { data: menusData } = useQuery({
    queryKey: [MENU_COLLECTION, "footer"],
    queryFn: () => getMenuPocket(`position="footer"`),
  });

  const { data: store } = useQuery({
    queryKey: [STORE_COLLECTION],
    queryFn: () => getStorePocket(),
    select: (data) => data?.[0],
  });

  const menuItems: MenuItem[] = menusData?.items ?? [];
  const tree = buildTree(menuItems);

  const socialLinks = [
    { name: "Facebook", href: "", icon: <Facebook /> },
    { name: "Youtube", href: "", icon: <Youtube /> },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Store Info */}
          <div className="lg:col-span-3">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  B
                </span>
              </div>
              <span className="font-bold text-xl">{store?.name}</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              {store?.description}
            </p>

            <div className="space-y-2">
              {store?.email && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{store.email}</span>
                </div>
              )}
              {store?.phone && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{store.phone}</span>
                </div>
              )}
              {store?.location && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground max-w-lg">
                  <MapPin className="h-4 min-w-4" />
                  <span>
                    {store.location.street}, {store.location.ward.name},{" "}
                    {store.location.district.name},{" "}
                    {store.location.province.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          {tree.map((section) => (
            <FooterSection key={section.id} section={section} />
          ))}
        </div>
      </div>

      <Separator />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} {store?.name ?? "senhome.vn"}
          </div>

          <div className="flex items-center space-x-2">
            {socialLinks.map((social) => (
              <Button key={social.name} variant="ghost" size="icon" asChild>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

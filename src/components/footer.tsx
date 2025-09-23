"use client";

import { useQuery } from "@tanstack/react-query";
import { Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { POLICY_COLLECTION, STORE_COLLECTION } from "@/pocketbase/constants";
import { getStorePocket } from "@/pocketbase/store/one";
import { getListPolicyPocket } from "@/pocketbase/store/policy/list";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const { data } = useQuery({
    queryKey: [STORE_COLLECTION],
    queryFn: () => getStorePocket(),
    select(data) {
      return data?.[0];
    },
  });

  const { data: policies } = useQuery({
    queryKey: [POLICY_COLLECTION],
    queryFn: () => getListPolicyPocket(),
  });

  const footerLinks = {
    company: [
      { name: "Về chúng tôi", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Tuyển dụng", href: "#careers" },
      { name: "Liên hệ", href: "#contact" },
    ],
    resources: [
      { name: "Cộng đồng", href: "#community" },
      { name: "Trung tâm trợ giúp", href: "#help" },
      { name: "Đối tác", href: "#partners" },
      { name: "Trạng thái", href: "#status" },
    ],
    legal: [
      { name: "Chính sách bảo mật", href: "#privacy" },
      { name: "Điều khoản", href: "#terms" },
      { name: "Cookie", href: "#cookies" },
      { name: "Bảo mật", href: "#security" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", href: data?.social?.facebook, icon: Facebook },
    { name: "Youtube", href: data?.social?.youtube, icon: Youtube },
  ];

  return (
    <footer className="bg-background border-t">
      {/* Nội dung chính của footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Phần thương hiệu */}
          <div className="lg:col-span-3">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  B
                </span>
              </div>
              <span className="font-bold text-xl">{data?.name}</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              {data?.description}
            </p>

            {/* Thông tin liên hệ */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{data?.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{data?.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground max-w-lg">
                <MapPin className="h-4 min-w-4" />
                <span>{data?.address}</span>
              </div>
            </div>
          </div>

          {/* Liên kết công ty */}
          <div>
            <h4 className="font-semibold mb-4">Công ty</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên kết tài nguyên */}
          <div>
            <h4 className="font-semibold mb-4">Tài nguyên</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên kết pháp lý */}
          <div>
            <h4 className="font-semibold mb-4">Chính sách</h4>
            <ul className="space-y-3">
              {policies?.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/policy/${item.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      {/* Phần dưới cùng */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>© {currentYear} senhome.vn</span>
            <span></span>
          </div>

          {/* Liên kết mạng xã hội */}
          <div className="flex items-center space-x-2">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                asChild
              >
                <a
                  href={social.href}
                  target="_blank"
                  aria-label={social.name}
                  className="hover:bg-accent"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

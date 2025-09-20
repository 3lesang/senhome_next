import { Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Facebook", href: "#facebook", icon: Facebook },
    { name: "Youtube", href: "#youtube", icon: Youtube },
  ];

  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Phần thương hiệu */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  B
                </span>
              </div>
              <span className="font-bold text-xl">SenHome</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Kiến tạo nét đẹp không gian sống
            </p>

            {/* Thông tin liên hệ */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>sales.senhome@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>093 310 86 80</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 min-w-4" />
                <span>
                  Số 23 Đường Số 5, KDC Cotec, Ấp 1, Xã Phú Xuân, Huyện Nhà Bè,
                  TP.Hồ Chí Minh, Việt Nam
                </span>
              </div>
            </div>
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

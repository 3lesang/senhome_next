export const runtime = "edge";

import Footer from "@/components/footer";
import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPagePocket } from "@/pocketbase/page";
import Content from "./content";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await getPagePocket(slug);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="">{page.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h3 className="font-bold text-2xl">{page.title}</h3>
        <Content data={JSON.stringify(page.content)} />
      </main>
      <Footer />
    </>
  );
}

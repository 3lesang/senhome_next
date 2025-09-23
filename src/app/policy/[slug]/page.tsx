import Footer from "@/components/footer";
import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getOnePolicyPocket } from "@/pocketbase/store/policy/one";
import Content from "./content";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const policy = await getOnePolicyPocket(slug);
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Chính sách</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="">{policy.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h3 className="font-bold text-2xl">{policy.title}</h3>
        <Content data={JSON.stringify(policy.content)} />
      </main>
      <Footer />
    </>
  );
}

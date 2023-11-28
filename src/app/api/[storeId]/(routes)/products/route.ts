import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";

import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    const product = await prisma.product.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        Image: true,
        color: true,
        size: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    const body = await req.json();
    const {
      name,
      price,
      imageUrl,
      isFeatured,
      isArchived,
      sizeId,
      colorId,
      categoryId,
    } = body;

    const user = await getUser();

    if (!(await isAuthenticated()) && !user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!isFeatured) {
      return new NextResponse("Featured is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
        categoryId,
        storeId: params.storeId,
        Image: {
          create: {
            url: [...imageUrl.map((url: string) => url)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";

import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { storeId: string; productId: string };
  }
) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      include: {
        Image: true,
        color: true,
        size: true,
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: { storeId: string; productId: string };
  }
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

    if (!sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    await prisma.product.update({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
        categoryId,
        Image: {
          delete: {},
        },
      },

      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });

    const product = await prisma.product.update({
      data: {
        Image: {
          create: {
            url: [...imageUrl.map((url: string) => url)],
          },
        },
      },
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { storeId: string; billboardId: string };
  }
) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    const user = await getUser();

    if (!(await isAuthenticated()) && !user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const product = await prisma.product.delete({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

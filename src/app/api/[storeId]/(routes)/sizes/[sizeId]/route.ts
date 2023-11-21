import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";

import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { storeId: string; sizeId: string };
  }
) {
  try {
    const size = await prisma.size.findFirst({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: { storeId: string; sizeId: string };
  }
) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    const body = await req.json();
    const { name, value } = body;

    const user = await getUser();

    if (!(await isAuthenticated()) && !user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    const size = await prisma.size.updateMany({
      data: {
        name,
        value,
      },
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { storeId: string; sizeId: string };
  }
) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    const user = await getUser();

    if (!(await isAuthenticated()) && !user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const size = await prisma.size.delete({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

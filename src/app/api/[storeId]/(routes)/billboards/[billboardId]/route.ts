import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";

import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { storeId: string; billboardId: string };
  }
) {
  try {
    const billboard = await prisma.billboard.findFirst({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: { storeId: string; billboardId: string };
  }
) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    const body = await req.json();
    const { name, imageUrl } = body;

    const user = await getUser();

    if (!(await isAuthenticated()) && !user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const billboard = await prisma.billboard.updateMany({
      data: {
        name,
        imageUrl,
      },
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
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

    const billboard = await prisma.billboard.delete({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

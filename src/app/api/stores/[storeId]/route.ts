import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";

import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    const body = await req.json();
    const { name } = body;

    const user = await getUser();

    if (!(await isAuthenticated()) && !user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prisma.store.updateMany({
      data: {
        name,
      },
      where: {
        id: params.storeId,
        userId: user?.id,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    const user = await getUser();

    if (!(await isAuthenticated()) && !user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const store = await prisma.store.delete({
      where: {
        id: params.storeId,
        userId: user?.id,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

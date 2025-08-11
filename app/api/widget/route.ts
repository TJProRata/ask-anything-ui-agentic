export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    // Minimal mock: echo with a prefix
    const reply = `You asked: ${message}. Here's a helpful response.`;
    return Response.json({ message: reply, metadata: { confidence: 0.95 } });
  } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
  }
}



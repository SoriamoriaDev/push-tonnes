import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'CLAUDE_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });
    const { session } = await request.json();

    if (!session || !session.exercises) {
      return NextResponse.json({ error: 'Invalid session data' }, { status: 400 });
    }

    // Format session data for Claude
    const exerciseSummary = session.exercises
      .map((e: { name: string; tonnage: number; sets: { reps: number; weight: number; volume: number }[] }) => {
        const setsStr = e.sets
          .map((s: { reps: number; weight: number; volume: number }) => `${s.reps}x${s.weight}kg = ${s.volume}kg`)
          .join(', ');
        return `${e.name}: ${setsStr} (Total: ${e.tonnage}kg)`;
      })
      .join('\n');

    const prompt = `You are an experienced personal trainer and gym coach. Analyze this workout session and provide coaching feedback.

Session Data:
Date: ${session.date}
Total Tonnage: ${session.totalTonnage}kg

Exercises:
${exerciseSummary}

${session.notes ? `Notes: ${session.notes}` : ''}

Provide your analysis in the following JSON format (no markdown, just raw JSON):
{
  "summary": "A 2-3 sentence overall assessment of the session",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["area to improve 1", "area to improve 2"],
  "recommendations": ["specific recommendation 1", "specific recommendation 2"]
}

Focus on:
- Volume and intensity balance
- Exercise selection and muscle group coverage
- Progressive overload potential
- Recovery considerations
- Set/rep scheme effectiveness

Keep responses concise and actionable. Maximum 3 items per category.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    try {
      const analysis = JSON.parse(text);
      return NextResponse.json(analysis);
    } catch {
      // If JSON parsing fails, create structured response from text
      return NextResponse.json({
        summary: text.slice(0, 300),
        strengths: [],
        improvements: [],
        recommendations: [],
      });
    }
  } catch (error) {
    console.error('AI analysis error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `AI analysis failed: ${message}` },
      { status: 500 }
    );
  }
}

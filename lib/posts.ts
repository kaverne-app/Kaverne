import { getSupabaseClient } from "./supabase";

export interface PostSummary {
  id: number;
  titel: string;
  slug: string;
  datum: string | null;
}

export interface PostReference {
  id: string | number;
  name: string;
}

export interface PostDetail extends PostSummary {
  text: string | null;
  venue: { id: string; name: string } | null;
  person: PostReference | null;
  reihe: PostReference | null;
}

// Bestimmt, ob der Magazin-Link in der Navigation überhaupt auftauchen
// soll — solange kein Beitrag existiert, gibt es auch keinen Link.
export async function hasAnyPost(): Promise<boolean> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("posts").select("id").limit(1);
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

export async function getPosts(): Promise<PostSummary[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id,titel,slug,datum")
    .order("datum", { ascending: false, nullsFirst: false });
  if (error) throw error;
  return data as PostSummary[];
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id,titel,slug,datum,text,venue:venues(id,name),person:people(id,name),reihe:reihen(id,name)",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as PostDetail | null;
}

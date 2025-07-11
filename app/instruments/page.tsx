
import { createClient } from '@supabase/supabase-js';


export default async function Instruments() {
    const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { data: instruments } = await supabase.from("instruments").select();
    return <pre>{JSON.stringify(instruments, null, 2)}</pre>
}

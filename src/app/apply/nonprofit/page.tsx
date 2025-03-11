import { getChapterApply, getNonprofitApply } from '@/lib/api';
import Apply from '../apply';


export default async function ChapterApply() {
  const nonprofitApplication = await getNonprofitApply();

  return Apply(nonprofitApplication.props);
}

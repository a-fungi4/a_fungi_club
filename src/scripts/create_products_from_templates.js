import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;

if (!PRINTFUL_API_KEY || !PRINTFUL_STORE_ID) {
  console.error('Missing PRINTFUL_API_KEY or PRINTFUL_STORE_ID in .env');
  process.exit(1);
}

async function fetchTemplates() {
  const res = await fetch('https://api.printful.com/v2/product-templates', {
    headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data.data || [];
}

async function getLibraryFiles() {
  const res = await fetch('https://api.printful.com/v2/files', {
    headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
  });
  let data;
  try {
    data = await res.json();
  } catch (e) {
    console.error('Failed to parse response from /v2/files:', e);
    throw new Error('Failed to fetch library files');
  }
  if (!res.ok) {
    console.error('Failed to fetch library files. Status:', res.status, res.statusText, 'Response:', data);
    throw new Error('Failed to fetch library files');
  }
  return data.result;
}

async function fetchTemplateDetails(templateId) {
  const res = await fetch(`https://api.printful.com/v2/product-templates/${templateId}`, {
    headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Failed to fetch template details for template_id ${templateId}: ${JSON.stringify(data)}`);
  return data.result;
}

async function createProductFromTemplate(template, libraryFiles) {
  // Fetch template details to get files
  let templateDetails;
  try {
    templateDetails = await fetchTemplateDetails(template.id);
  } catch (err) {
    console.error(`Failed to fetch template details for template_id ${template.id}:`, err.message);
    return;
  }
  // Debug logging for template structure
  console.log('---');
  console.log('Processing template:', template.id, template.name);
  console.log('available_catalog_variants:', template.available_catalog_variants);
  console.log('files:', templateDetails.files);

  const thumbnail = templateDetails.files && templateDetails.files.length > 0 ? templateDetails.files[0].url : '';
  const name = template.name || `API Product ${template.id}`;
  const variant_ids = template.available_catalog_variants && template.available_catalog_variants.length > 0 ? template.available_catalog_variants : [];
  if (variant_ids.length === 0) {
    console.error(`No available_catalog_variant found in template ${template.id} (${name})`);
    return;
  }
  let file = templateDetails.files && templateDetails.files.length > 0 ? templateDetails.files[0] : null;
  if (!file) {
    // Use the most recent file from the library as fallback
    if (libraryFiles && libraryFiles.length > 0) {
      file = libraryFiles[0];
      console.warn(`No file found in template ${template.id} (${name}), using library file:`, file.filename, file.url);
    } else {
      console.error(`No file found in template ${template.id} (${name}) and no library files available.`);
      return;
    }
  }

  // Log what will be used for product creation
  console.log(`Creating product with file: ${file.url}`);

  const category = name.includes(':') ? name.split(':')[0].trim() : 'Uncategorized';
  const productName = `${category}: ${name}`;

  const sync_variants = variant_ids.map(variant_id => ({
    variant_id,
    files: [
      {
        type: 'default',
        url: file.url,
      },
    ],
  }));
  const payload = {
    sync_product: {
      name: productName,
      thumbnail: thumbnail,
    },
    sync_variants,
  };
  const res = await fetch(`https://api.printful.com/v2/stores/${PRINTFUL_STORE_ID}/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data.data;
}

(async () => {
  try {
    const templates = await fetchTemplates();
    console.log(`Found ${templates.length} templates.`);
    const libraryFiles = await getLibraryFiles();
    for (const template of templates) {
      try {
        await createProductFromTemplate(template, libraryFiles);
        console.log('Created product:', template.id, template.name);
      } catch (err) {
        console.error('Failed to create product from template', template.id, template.name, err);
      }
    }
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
  }
})(); 
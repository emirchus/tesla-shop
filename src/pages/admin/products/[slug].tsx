import React, { FC, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined
} from '@mui/icons-material';
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { Product, ProductSize, ProductType } from '../../../interfaces';
import { AdminLayout } from '../../../components/layout';
import { getProductBySlug } from '../../../database';
import { useForm } from 'react-hook-form';
import { teslaAPI } from '../../../api';
import { ProductModel } from '../../../models';
import { useRouter } from 'next/router';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

type Genders = 'men' | 'women' | 'kid' | 'unisex';

interface Props {
  product: Product;
}

type FormFields = {
  _id?: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  slug: string;
  type: ProductType;
  gender: Genders;
  tags: string[];
  sizes: ProductSize[];
  images: string[];
};

const ProductAdminPage: FC<Props> = ({ product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch
  } = useForm<FormFields>({
    defaultValues: product
  });

  const router = useRouter();

  const [newTagValue, setNewTagValue] = useState('');

  const [isSaving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeSize = (value: ProductSize) => {
    const currentSizes = getValues('sizes');

    if (currentSizes.includes(value)) {
      return setValue(
        'sizes',
        currentSizes.filter(size => size !== value),
        {
          shouldValidate: true
        }
      );
    }

    setValue('sizes', [...currentSizes, value], {
      shouldValidate: true
    });
  };

  const onDeleteImage = (index: number) => {
    const currentImages = getValues('images');

    setValue(
      'images',
      currentImages.filter((_, i) => i !== index),
      {
        shouldValidate: true
      }
    );
  };

  useEffect(() => {
    const observer = watch((value, { name, type }) => {
      if (name === 'title') {
        const recommendedSlug = value.title
          ?.toLowerCase()
          .normalize('NFKD')
          .trim()
          .replace(/\s+/g, '_')
          .replace(/([\u0300-\u036f]|\W|\s)+/g, '');

        setValue('slug', recommendedSlug ?? product.slug);
      }
    });

    return () => {
      observer.unsubscribe();
    };
  }, [watch]);

  const onDeleteTag = (tag: number) => {
    const currentTags = getValues('tags');

    setValue(
      'tags',
      currentTags.filter((_, index) => index !== tag),
      {
        shouldValidate: true
      }
    );
  };

  const handleOpenFileInput = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log(file);

      const { data } = await teslaAPI.post<{ message: string }>(
        '/admin/upload',
        formData
      );
      console.log(data);

      setValue('images', [...getValues('images'), data.message], {
        shouldValidate: true
      });

      e.target.value = '';
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (form: FormFields) => {
    if (form.images.length < 2) {
      return;
    }
    setSaving(true);
    try {
      const { data }: { data: Product } = await teslaAPI({
        url: `/admin/products/${product._id ?? ''}`,
        method: form._id ? 'PUT' : 'POST',
        data: form
      });

      if (!form._id) {
        router.replace(`/admin/products/${data.slug}`);
      } else {
        setSaving(false);
      }

      setSaving(false);
    } catch (error) {
      console.log(error);

      setSaving(false);
    }
  };

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event);
    if (event.code === 'Space') {
      event.preventDefault();
      const currentTags = getValues('tags');
      setValue(
        'tags',
        Array.from(new Set([...currentTags, newTagValue.toLowerCase()])),
        {
          shouldValidate: true
        }
      );
      setNewTagValue('');

      console.log(event.currentTarget);
      return;
    }
  };

  return (
    <AdminLayout
      title={'Producto'}
      description={`Editando: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Título"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Descripción"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register('description', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Inventario"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Precio"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('price', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                value={getValues('type') ?? product.type}
                onChange={({ target }) =>
                  setValue('type', target.value as ProductType, {
                    shouldValidate: true
                  })
                }
              >
                {validTypes.map(option => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                value={getValues('gender') ?? product.gender}
                onChange={({ target }) =>
                  setValue('gender', target.value as Genders, {
                    shouldValidate: true
                  })
                }
              >
                {validGender.map(option => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Tallas</FormLabel>
              {validSizes.map(size => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      checked={getValues('sizes').includes(size as ProductSize)}
                      onChange={() => handleChangeSize(size as ProductSize)}
                    />
                  }
                  label={size}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                validate: value =>
                  value.trim().includes(' ')
                    ? 'No puede contener espacios'
                    : true
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Etiquetas"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Presiona [spacebar] para agregar"
              onKeyDown={handleAddTag}
              onChange={event => setNewTagValue(event.target.value)}
              value={newTagValue}
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0
              }}
              component="ul"
            >
              {getValues('tags').map((tag, index) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(index)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                onClick={handleOpenFileInput}
              >
                Cargar imagen
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/gif,image/jpg,image/jpeg,image/webp"
                style={{ display: 'none' }}
                onChange={handleUploadImages}
              />
              {getValues('images').length < 2 && (
                <Chip
                  label="Es necesario al 2 imagenes"
                  color="error"
                  variant="outlined"
                />
              )}

              <Grid container spacing={2}>
                {getValues('images').map((img, index) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={img}
                        alt={img}
                      />
                      <CardActions>
                        <Button
                          fullWidth
                          color="error"
                          onClick={() => onDeleteImage(index)}
                        >
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  let product: Partial<Product> | null | undefined;

  if (slug === 'new') {
    product = JSON.parse(JSON.stringify(new ProductModel())) as Product;
    delete product['_id'];
    product.images = [];
  } else {
    product = await getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false
      }
    };
  }

  return {
    props: {
      product
    }
  };
};

export default ProductAdminPage;
